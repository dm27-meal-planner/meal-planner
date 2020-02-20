INSERT INTO list_items (quantity, unit, list_id, spoon_id, price, name, imageurl, mealplan_id)
VALUES ($1, $2, 
(SELECT list_id FROM grocery_list WHERE user_id = $3),
$4, $5, $6, $7, $8);