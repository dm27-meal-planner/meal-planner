SELECT 
fridge_id, fridge.user_id, fridge.fridge_item_id, 
fridge_item.ingredient_id, fridge_item.quantity, fridge_item.unit, fridge_item.date_added,
ingredients.ingredient_id, ingredients.ingredient_name, ingredients.units
FROM fridge
INNER JOIN fridge_item ON fridge_item.fridge_item_id = fridge.fridge_item_id
INNER JOIN ingredients ON fridge_item.ingredient_id = ingredients.ingredient_id
WHERE fridge.user_id = $1;