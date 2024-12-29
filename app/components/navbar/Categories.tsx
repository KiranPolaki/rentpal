"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  GiGamepad,
  GiMusicalNotes,
  GiClothes,
  GiKitchenKnives,
  GiWeightLiftingUp,
} from "react-icons/gi";
import { MdOutlineDevicesOther } from "react-icons/md";
import { BiParty, BiCamera, BiBook, BiCar } from "react-icons/bi";
// import { Tractor, Axe, SprayCan, Vegan } from "lucide-react";
import {
  Tractor,
  Pickaxe,
  SprayCan,
  Axe,
  FireExtinguisher,
  HandHelping,
  Vegan,
  Fence,
  HelpingHand,
} from "lucide-react";

import CategoryBox from "../CategoryBox";
import Container from "../Container";

export const categories = [
  {
    label: "Tractors",
    icon: Tractor,
    description:
      "High-efficiency tractors for all your farming needs, ensuring powerful performance and reliability.",
  },
  {
    label: "Harvesters",
    icon: Pickaxe,
    description:
      "Efficient harvesters to help you collect crops quickly and effectively, saving time and labor.",
  },
  {
    label: "Plows",
    icon: Axe,
    description:
      "Durable plows for turning over the soil, preparing your fields for the next planting season.",
  },
  {
    label: "Sprayers",
    icon: SprayCan,
    description:
      "Advanced sprayers for applying fertilizers, herbicides, and pesticides evenly across your crops.",
  },
  {
    label: "Irrigation",
    icon: HandHelping,
    description:
      "Comprehensive irrigation systems to ensure your crops get the right amount of water.",
  },
  {
    label: "Seeders",
    icon: Vegan,
    description:
      "Precision seeders for planting seeds efficiently and uniformly across large fields.",
  },
  {
    label: "Fencing",
    icon: Fence,
    description:
      "Robust fencing solutions to secure your farmland and livestock from intruders and predators.",
  },
  {
    label: "Wheelbarrows",
    icon: FireExtinguisher,
    description:
      "Sturdy wheelbarrows for transporting materials and produce around your farm with ease.",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          gap-8
          mr-16
          flex-row 
          items-center 
          justify-center
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
