DELETE FROM list_items
WHERE mealplan_id = $2;
SELECT list_item_id, quantity, unit, spoon_id, price, mealplan_id , name, imageurl FROM list_items WHERE list_id = (SELECT list_id FROM grocery_list WHERE user_id = $1);