from dataclasses import dataclass
from typing import List, Dict, Union
from flask import Flask, request, jsonify
import re

# ==== Type Definitions, feel free to add or modify ===========================
@dataclass
class CookbookEntry:
	name: str



@dataclass
class RequiredItem():
	name: str
	quantity: int

@dataclass
class Recipe(CookbookEntry):
	required_items: List[RequiredItem]

@dataclass
class Ingredient(CookbookEntry):
	cook_time: int


# =============================================================================
# ==== HTTP Endpoint Stubs ====================================================
# =============================================================================
app = Flask(__name__)

# Store your recipes here!
cookbook = {}

# Task 1 helper (don't touch)
@app.route("/parse", methods=['POST'])
def parse():
	data = request.get_json()
	recipe_name = data.get('input', '')
	parsed_name = parse_handwriting(recipe_name)
	if parsed_name is None:
		return 'Invalid recipe name', 400
	return jsonify({'msg': parsed_name}), 200

# [TASK 1] ====================================================================
# Takes in a recipeName and returns it in a form that 
def parse_handwriting(recipeName: str) -> Union[str | None]:
	# TODO: implement
	print(recipeName)
	temp:str = re.sub(r'[-_]', ' ', recipeName)
	print(temp)
	temp = re.sub(r'[^a-zA-Z ]', '', temp)
	print(temp)
	temp = re.sub(r'\s+', ' ', temp).strip().title()
	print(temp)
	recipeName = temp
	
	print(cookbook)

	# Check if the recipeName is valid
	if len(recipeName) == 0:
		return None
	
	return recipeName


# [TASK 2] ====================================================================
# Endpoint that adds a CookbookEntry to your magical cookbook
@app.route('/entry', methods=['POST'])
def create_entry():
	# TODO: implement me
	data = request.get_json()
	print(data)
	food_type = data.get('type', '')
	food_name = data.get('name', '')
	required_items = data.get('requiredItems', [])

	if food_type not in ['recipe', 'ingredient']:
		return 'Invalid type: must be "recipe" or "ingredient"', 400
	
	cook_time = -1
	if food_type == 'ingredient':
		cook_time = data.get('cookTime', -1)
		if not isinstance(cook_time, int) or cook_time < 0:
			return 'Invalid cookTime: must be a greater than or equal to 0', 400

	
	if food_name in cookbook:
		return 'Invalid name: must be unique', 400
	
	seen_items = set()
	list_items = []
	for item in required_items:
		if item['name'] in seen_items:
			# Note: Original Auotests does not check for duplicate item names
			return 'Invalid requiredItems: duplicate item names are not allowed', 400
		seen_items.add(item['name'])
		list_items.append(RequiredItem(name=item['name'], quantity=item['quantity']))

	if food_type == 'recipe':
		cookbook[food_name] = Recipe(name=food_name, required_items=list_items)
	elif food_type == 'ingredient':
		cookbook[food_name] = Ingredient(name=food_name, cook_time=cook_time)

	# Autotests needs empty object to be returned when succesfully created
	# return jsonify({'msg': f'Created {food_type} "{food_name}"'}), 200
	return jsonify({}), 200


# [TASK 3] ====================================================================
# Endpoint that returns a summary of a recipe that corresponds to a query name
@app.route('/summary', methods=['GET'])
def summary():
	# TODO: implement me
	return 'not implemented', 500


# =============================================================================
# ==== DO NOT TOUCH ===========================================================
# =============================================================================

if __name__ == '__main__':
	app.run(debug=True, port=8080)
