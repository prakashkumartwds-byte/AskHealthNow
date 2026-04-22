import React, { useEffect, useRef, useState } from "react";
import { MapPin, ChevronDown, Navigation, Search, Loader2 } from "lucide-react";

const LocationBox = () => {
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const boxRef = useRef(null);
  const debounceRef = useRef(null);

  // ✅ Save location + send lat/lng to backend (hidden from user)
  const applyLocation = async (displayName, lat, lng) => {
    setLocation(displayName);
    setQuery(displayName);
    setOpen(false);

    // Save to localStorage
    localStorage.setItem(
      "userLocation",
      JSON.stringify({ displayName, lat, lng })
    );

    // ✅ Send to your Express backend
    try {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:8080/api/store/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          storeName: "AskHealthNow User",
          lat,
          lng,
          address: displayName,
        }),
      });
    } catch (err) {
      console.error("Failed to save location to backend:", err);
    }
  };

  const fetchSuggestions = async (searchText) => {
    if (!searchText.trim()) { setSuggestions([]); return; }
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}&addressdetails=1&limit=5`
      );
      const data = await res.json();
      setSuggestions(data || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(query), 400);
    return () => clearTimeout(debounceRef.current);
  }, [query, open]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ GPS - get real coordinates
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) { alert("Geolocation not supported"); return; }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          await applyLocation(data.display_name || "Your Location", latitude, longitude);
        } catch {
          alert("Could not fetch your location name");
        } finally {
          setLoading(false);
        }
      },
      () => { setLoading(false); alert("Location access denied."); }
    );
  };

  // ✅ Search result - extract lat/lng from Nominatim
  const handleSelectLocation = async (item) => {
    await applyLocation(item.display_name, parseFloat(item.lat), parseFloat(item.lon));
  };

  return (
    <div ref={boxRef} className="relative z-50 w-[320px] shrink-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-14 w-full items-center gap-3 rounded-full border border-slate-200 bg-white px-4 shadow-sm"
      >
        <MapPin className="h-5 w-5 shrink-0 text-[#1C398E]" />
        <span className="min-w-0 flex-1 truncate text-left text-sm font-medium text-slate-700">
          {location || "Enter your location"}
        </span>
        <ChevronDown className="h-5 w-5 shrink-0 text-slate-600" />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 z-50 w-full rounded-3xl bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.16)]">
          <div className="mb-4 flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search city, airport, railway station..."
              className="w-full bg-transparent text-sm outline-none"
              autoFocus
            />
          </div>

          <button
            type="button"
            onClick={handleCurrentLocation}
            className="flex items-center gap-3 text-[15px] font-semibold text-[#00BC7D]"
          >
            <Navigation className="h-4 w-4 cursor-pointer fill-[#00BC7D] text-[#00BC7D]" />
            Use my current location
          </button>

          <div className="my-5 border-t border-slate-200" />

          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
            Search Results
          </p>

          <div className="max-h-72 space-y-3 overflow-y-auto">
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading...
              </div>
            ) : suggestions.length > 0 ? (
              suggestions.map((item) => (
                <button
                  type="button"
                  key={item.place_id}
                  onClick={() => handleSelectLocation(item)}
                  className="flex w-full items-start gap-3 rounded-xl p-2 text-left hover:bg-slate-50"
                >
                  <Navigation className="mt-1 h-4 w-4 shrink-0 text-slate-600" />
                  <span className="text-sm text-slate-700">{item.display_name}</span>
                </button>
              ))
            ) : query.trim() ? (
              <p className="text-sm text-slate-500">No locations found</p>
            ) : (
              <p className="text-sm text-slate-500">Start typing to see suggestions</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationBox;