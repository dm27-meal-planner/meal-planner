INSERT INTO list_items (quantity, unit, list_id, spoon_id, price, name, imageurl)
VALUES ($1, $2, 
(SELECT list_id FROM grocery_list WHERE user_id = $3),
$4, $5, $6, $7);