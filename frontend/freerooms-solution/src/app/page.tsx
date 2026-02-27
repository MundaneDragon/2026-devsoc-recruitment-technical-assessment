import Image from "next/image";
import { Button } from "@/components/ui/button";

// Mock data matching the buildings from the design
const buildings = [
  {
      "name": "AGSM", 
      "rooms_available": 9,
      "building_picture": "agsm.webp"
    },
    {
      "name": "Ainsworth Building",
      "rooms_available": 16,
      "building_picture": "ainsworth.webp"
    },
    {
      "name": "Anita B Lawrence Centre",
      "rooms_available": 44,
      "building_picture": "anitab.webp"
    },
    {
      "name": "Biological Sciences",
      "rooms_available": 6,
      "building_picture": "biologicalScience.webp"
    },
    {
      "name": "Biological Science (West)",
      "rooms_available": 8,
      "building_picture": "biologicalScienceWest.webp"
    },
    {
      "name": "Blockhouse",
      "rooms_available": 42,
      "building_picture": "blockhouse.webp"
    },
    {
      "name": "Business School",
      "rooms_available": 18,
      "building_picture": "businessSchool.webp"
    },
    {
      "name": "Civil Engineering Building",
      "rooms_available": 8,
      "building_picture": "civilBuilding.webp"
    },
    {
      "name": "Colombo Building",
      "rooms_available": 5,
      "building_picture": "colombo.webp"
    },
    {
      "name": "Computer Science & Eng (K17)",
      "rooms_available": 7,
      "building_picture": "cseBuilding.webp"
    }
];

export default function Home() {
  return (
   <div className="max-w-[1600px] flex flex-col">
      <header className="flex items-center justify-between border-b p-4">

        <div className="flex items-center cursor-pointer">
          <Image 
            src="/freeRoomsLogo.png" 
            alt="Freerooms Logo" 
            className=""
            width={40}
            height={40}
          />
          <h1 className="hidden md:inline text-4xl font-bold text-orange-500 tracking-[1px]">Freerooms</h1>
        </div>
        
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
        <div className="flex items-center justify-between mb-4">

        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
        </div>
      </main>
    </div>
  );
}
