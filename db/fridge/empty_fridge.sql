DELETE FROM fridge_item WHERE fridge_id = (SELECT fridge_id FROM fridge WHERE user_id = $1);
SELECT * FROM fridge WHERE user_id = $1;