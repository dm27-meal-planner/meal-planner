-- SELECT 
-- fridge_id, fridge.user_id, fridge.fridge_item_id, 
-- fridge_item.quantity, fridge_item.unit, fridge_item.date_added, fridge_item.ingredient_name,
-- ingredients.ingredient_id, ingredients.ingredient_name, ingredients.units
-- FROM fridge
-- INNER JOIN fridge_item ON fridge_item.fridge_item_id = fridge.fridge_item_id
-- INNER JOIN ingredients ON fridge_item.ingredient_id = ingredients.ingredient_id
-- WHERE fridge.user_id = $1;

SELECT i.*, FI.quantity, FI.date_added, FI.unit FROM ingredients i
INNER JOIN fridge_item FI ON i.ingredient_id = fi.ingredient_id
INNER JOIN fridge f ON fi.fridge_id = f.fridge_id
INNER JOIN users u ON u.user_id = f.user_id
WHERE u.user_id = $1;