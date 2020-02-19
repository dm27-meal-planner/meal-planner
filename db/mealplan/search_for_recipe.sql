SELECT recipe_id, name, cook_time, servings, image FROM recipes 
WHERE name ~*($1)
ORDER BY RANDOM()
