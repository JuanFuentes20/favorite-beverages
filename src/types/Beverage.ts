enum BeverageType {
    Coffee,
    Tea
  }

enum RoastLevel {
    LightRoast = 1,
    MediumRoast,
    DarkRoast,
    EspressoRoast,
    FrenchRoast
}
  
  type Beverage = {
    id: string;
    type: BeverageType;
    name: string;
    weight: number;
    price: number;
    roastLevel: RoastLevel;
  };

export { BeverageType, RoastLevel };
export type { Beverage };
