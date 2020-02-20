INSERT INTO mealplan (user_id, date, nutritional_info, followed_plan, resourceid, title, image, recipe_id, ingredients, directions, total_time)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
SELECT * FROM mealplan
WHERE user_id = $1
ORDER BY user_id ASC