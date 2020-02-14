INSERT INTO mealplan (user_id, date, nutritional_info, followed_plan, resourceid, title, image)
VALUES($1, $2, $3, $4, $5, $6, $7);
SELECT * FROM mealplan
WHERE user_id = $1