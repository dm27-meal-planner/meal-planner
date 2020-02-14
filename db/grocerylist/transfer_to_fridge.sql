INSERT INTO fridge_item (quantity, unit, date_added, fridge_id, ingredient_name, imageurl, spoon_id)
VALUES ($1, $2, CURRENT_TIMESTAMP(0),
(SELECT fridge_id FROM fridge WHERE user_id = $3),
$4, $5, $6);
DELETE FROM list_items WHERE list_item_id = $7;