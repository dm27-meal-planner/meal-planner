-- SELECT i.*, FI.quantity, FI.date_added, FI.unit FROM ingredients i
-- INNER JOIN fridge_item FI ON i.ingredient_id = fi.ingredient_id
-- INNER JOIN fridge f ON fi.fridge_id = f.fridge_id
-- INNER JOIN users u ON u.user_id = f.user_id
-- WHERE u.user_id = $1;

SELECT fridge_item_id, quantity, unit, date_added, ingredient_name, imageurl, spoon_id FROM fridge_item
WHERE fridge_id = (SELECT fridge_id FROM fridge WHERE user_id = $1);