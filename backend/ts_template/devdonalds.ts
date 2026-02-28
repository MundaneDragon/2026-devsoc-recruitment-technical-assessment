import express, { Request, Response } from "express";

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
  name: string;
  type: string;
}

interface requiredItem {
  name: string;
  quantity: number;
}

interface recipe extends cookbookEntry {
  requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
  cookTime: number;
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: Map<string, cookbookEntry> = new Map(); // cookbookEntry = null;

// Task 1 helper (don't touch)
app.post("/parse", (req: Request, res: Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input)
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  }
  res.json({ msg: parsed_string });
  return;

});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that 
const parse_handwriting = (recipeName: string): string | null => {

  recipeName = recipeName.replace(/[-_]/g, " ");

  recipeName = recipeName.replace(/[^a-zA-Z ]/g, "");

  recipeName = recipeName.replace(/\s+/g, " ");

  recipeName = recipeName.toLowerCase();

  console.log(recipeName);
  // Capitalize the first letter of each word
  recipeName = recipeName.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  console.log(recipeName);

  if (recipeName.length == 0) {
    return null;
  }

  const mapAsObject = Object.fromEntries(cookbook);
  console.log(JSON.stringify(mapAsObject, null, 2));

  return recipeName
}

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req: Request, res: Response) => {

  const data = req.body;
  console.log(data);
  const food_name: string = data.name;
  const food_type: string = data.type;

  if (food_type != "ingredient" && food_type != "recipe") {
    res.status(400).send("invalid type");
    return;
  }

  let cook_time = -1;
  if (food_type == "ingredient") {
    cook_time = data.cookTime;
    if (cook_time < 0) {
      res.status(400).send("invalid cook time");
      return;
    }
  }

  if (cookbook.has(food_name)) {
    res.status(400).send("entry already exists");
    return;
  }

  let list_items: requiredItem[] = [];
  let seen_array: string[] = [];
  if (food_type == "recipe") {
    for (let item of data.requiredItems) {

      if (item.name in seen_array) {
        res.status(400).send("duplicate item");
        return;
      }

      if (item.quantity < 0) {
        res.status(400).send("invalid quantity");
        return;
      }

      let required_item: requiredItem = {
        name: item.name,
        quantity: item.quantity
      }

      seen_array.push(item.name);
      list_items.push(required_item);
    }
  }

  if (food_type == "ingredient") {
    const new_ingredient: ingredient = {
      name: food_name,
      type: food_type,
      cookTime: cook_time
    }
    cookbook.set(food_name, new_ingredient);
  } else {
    const new_recipe: recipe = {
      name: food_name,
      type: food_type,
      requiredItems: list_items
    }
    cookbook.set(food_name, new_recipe);
  }
  res.status(200).send({});
});

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req: Request, res: Request) => {
  const foodSummaryName = (req.query.name as string);
  const ingredientSummary: Map<string, number> = new Map();
  let totalCookTime = 0;

  // Using a standard array as a queue
  const foodQueue: string[] = [foodSummaryName];

  while (foodQueue.length > 0) {
      const currentFoodName:string = foodQueue.shift()!; // popleft equivalent

      if (!cookbook.has(currentFoodName)) {
          return res.status(400).send(`Invalid recipe name: "${currentFoodName}"`);
      }

      const entry = cookbook.get(currentFoodName)! as recipe;

      if (entry.type === "ingredient") {
          return res.status(400).send(`Invalid recipe name: "${currentFoodName}" is an ingredient, not a recipe`);
      }

      // Assuming Quantity is always non-negative integer
      for (const item of entry.requiredItems) {
        let isRecipe = cookbook.get(item.name)?.type === "recipe";
          if (isRecipe) {
              for (let i = 0; i < item.quantity; i++) {
                  foodQueue.push(item.name);
              }
          } else {
              if (!cookbook.has(item.name)) {
                  return res.status(400).send(`Invalid ingredient name: "${item.name}"`);
              }

              const currentIngredient = cookbook.get(item.name)! as ingredient;

              ingredientSummary.set(item.name, (ingredientSummary.get(item.name) || 0) + item.quantity);
              totalCookTime += currentIngredient.cookTime * item.quantity;
          }
      }
  }

  const result = {
      name: foodSummaryName,
      cookTime: totalCookTime,
      ingredients: Object.fromEntries(ingredientSummary)
  };

  console.log(result);
  return res.status(200).json(result);

});

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});
