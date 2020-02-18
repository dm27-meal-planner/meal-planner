DELETE FROM fridge_item WHERE fridge_item_id = $2;

SELECT fridge_item_id, quantity, unit, date_added, ingredient_name, imageurl, spoon_id FROM fridge_item
WHERE fridge_id = (SELECT fridge_id FROM fridge WHERE user_id = $1);