SELECT quantity, unit, spoon_id, price, name, imageurl FROM list_items WHERE list_id = (SELECT list_id FROM grocery_list WHERE user_id = $1);