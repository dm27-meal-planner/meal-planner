INSERT INTO mealplan (user_id, meal_start, nutritional_info, followed_plan, meal_type, meal_title)
VALUES($1, $2, $3, $4, $5, $6)
RETURNING * 