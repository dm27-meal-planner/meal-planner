DELETE FROM fridge_item WHERE fridge_item_id = $2;
SELECT fi.fridge_item_id, fi.quantity, fi.unit, fi.date_added, fi.ingredient_name, fi.imageurl, fi.spoon_id, fi.mealplan_id, m.date AS meal_date FROM fridge_item fi
INNER JOIN mealplan m ON m.mealplan_id = fi.mealplan_id
WHERE fridge_id = (SELECT fridge_id FROM fridge WHERE user_id = $1)
ORDER BY fridge_item_id ASC