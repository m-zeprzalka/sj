"use client"

import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { translateCountryName } from "@/lib/country-names"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

interface WorldMapProps {
  onCountryClick: (countryCode: string, countryName: string) => void
  selectedCountry?: string
}

export function WorldMap({ onCountryClick, selectedCountry }: WorldMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const [hoveredName, setHoveredName] = useState<string>("")
  const [zoom, setZoom] = useState(1)
  const [center, setCenter] = useState<[number, number]>([0, 20])

  const handleCountryEnter = (geo: any) => {
    setHoveredCountry(geo.properties.name)
    setHoveredName(translateCountryName(geo.properties.name))
  }

  const handleCountryLeave = () => {
    setHoveredCountry(null)
    setHoveredName("")
  }

  const handleZoomIn = () => {
    if (zoom < 4) setZoom(zoom * 1.5)
  }

  const handleZoomOut = () => {
    if (zoom > 1) setZoom(zoom / 1.5)
  }

  const handleReset = () => {
    setZoom(1)
    setCenter([0, 20])
  }

  const handleMoveEnd = (position: any) => {
    setCenter(position.coordinates)
    setZoom(position.zoom)
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-primary/5 via-background to-background">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 147,
        }}
        className="w-full h-full"
      >
        <ZoomableGroup
          zoom={zoom}
          center={center}
          onMoveEnd={handleMoveEnd}
          minZoom={1}
          maxZoom={4}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isSelected = selectedCountry === geo.properties.name
                const isHovered = hoveredCountry === geo.properties.name

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => handleCountryEnter(geo)}
                    onMouseLeave={handleCountryLeave}
                    onClick={() =>
                      onCountryClick(
                        geo.properties.name,
                        translateCountryName(geo.properties.name)
                      )
                    }
                    fill={isSelected ? "#6b46c1" : "#e9e9e9"}
                    stroke="#d0d0d0"
                    strokeWidth={0.5}
                    className={`outline-none transition-all duration-200 ${
                      isSelected
                        ? ""
                        : "hover:fill-[#9b7fd6] hover:stroke-[#6b46c1]"
                    } ${isSelected ? "" : "cursor-pointer"}`}
                  />
                )
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleZoomIn}
          disabled={zoom >= 4}
          className="bg-card shadow-lg"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleZoomOut}
          disabled={zoom <= 1}
          className="bg-card shadow-lg"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleReset}
          className="bg-card shadow-lg"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredCountry && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-card border rounded-lg shadow-xl pointer-events-none z-50"
          >
            <p className="text-sm font-semibold">{hoveredName}</p>
            <p className="text-xs text-muted-foreground">
              Kliknij aby wygenerować scenariusze
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
