import Image from "next/image";
import { Button } from "@/components/ui/button";
import ClickableImageDiv from "@/components/ui/image-change";

// Mock data matching the buildings from the design
const buildings = [
  {
      "name": "AGSM", 
      "rooms_available": 9,
      "building_picture": "/agsm.webp"
    },
    {
      "name": "Ainsworth Building",
      "rooms_available": 16,
      "building_picture": "/ainsworth.webp"
    },
    {
      "name": "Anita B Lawrence Centre",
      "rooms_available": 44,
      "building_picture": "/anitab.webp"
    },
    {
      "name": "Biological Sciences",
      "rooms_available": 6,
      "building_picture": "/biologicalScience.webp"
    },
    {
      "name": "Biological Science (West)",
      "rooms_available": 8,
      "building_picture": "/biologicalScienceWest.webp"
    },
    {
      "name": "Blockhouse",
      "rooms_available": 42,
      "building_picture": "/blockhouse.webp"
    },
    {
      "name": "Business School",
      "rooms_available": 18,
      "building_picture": "/businessSchool.webp"
    },
    {
      "name": "Civil Engineering Building",
      "rooms_available": 8,
      "building_picture": "/civilBuilding.webp"
    },
    {
      "name": "Colombo Building",
      "rooms_available": 5,
      "building_picture": "/colombo.webp"
    },
    {
      "name": "Computer Science & Eng (K17)",
      "rooms_available": 7,
      "building_picture": "/cseBuilding.webp"
    }
];

export default function Home() {
  return (
   <div className="max-w-[1600px] flex flex-col">
      <header className="flex items-center justify-between border-b p-4">

        <ClickableImageDiv initialImage="/freeRoomsLogo.png" nextImage="/freeroomsDoorClosed.png" />
        
        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className=" border border-orange-200">
            <img src="search.svg" alt="search icon" />
          </Button>
          <Button variant="default" size="icon" className="bg-orange-500 hover:bg-orange-600">
            <img src="grid-view.svg" alt="grid icon" />
          </Button>
          <Button variant="ghost" size="icon" className=" border border-orange-200">
            <img src="map.svg" alt="map icon" />
          </Button>
          <Button variant="ghost" size="icon" className=" border border-orange-200">
            <img src="dark-mode.svg" alt="dark mode icon" />
          </Button>
        </nav>

      </header>

      <main className="p-4">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <Button variant="ghost" size="lg" className="order-2 border-3 border-orange-500 cursor-pointer">
            <img src="filter_alt.svg" alt="filter alt button" />
            <h1 className="text-md font-bold text-orange-500 ">Filter</h1>
          </Button>
          <div className="h-10 w-80 w-full order-1 sm:w-80 sm:order-3 md:w-120 lg:w-160 border-1 border-gray-300 rounded-sm flex items-center gap-2 px-4 mb-2 cursor-text">
            <img src="search-bar-icon.svg" alt="search bar icon" />
            <h1 className="text-md font-medium text-gray-400 ">Searching for a building...</h1>
          </div>
          <Button variant="ghost" size="lg" className=" order-4 border-3 border-orange-500 cursor-pointer">
            <img src="filter_list.svg" alt="filter list button" />
            <h1 className="text-md font-bold text-orange-500 ">Sort</h1>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
          {buildings.map((building) => (
            <div 
              key={building.name} 
              className="relative border rounded-lg overflow-hidden cursor-pointer h-15 xs:h-19 sm:h-40 md:h-50 lg:h-65"
            >
              <img src={building.building_picture} alt={building.name} className="w-full h-full object-cover brightness-50 sm:brightness-100"/>
              <div className="absolute  bottom-1/2 translate-y-1/2 sm:translate-y-0 sm:bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] h-[20%] sm:rounded-md sm:bg-orange-500 flex items-center sm:px-2 sm:mb-2">
                <h2 className="top-0 left-0 text-sm font-bold sm:font-medium text-white">{building.name}</h2>
              </div>
              <div className="absolute flex items-center top-1/2 transform -translate-y-1/2 sm:translate-y-0 sm:top-0 right-0 bg-white rounded-xl p-2 sm:mt-2 mr-2">
                <div className="bg-green-500 h-2 w-2 rounded-full mr-2"></div>
                <p className=" text-xs font-medium mr-1">{building.rooms_available}</p>
                <p className=" sm:hidden text-xs font-medium mr-1">/ {building.rooms_available}</p>
                <p className=" hidden sm:inline text-xs font-medium"> rooms available</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
