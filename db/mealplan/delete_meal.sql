DELETE FROM mealplan
WHERE mealplan_id  = $1;
SELECT * FROM mealplan
WHERE user_id = $2