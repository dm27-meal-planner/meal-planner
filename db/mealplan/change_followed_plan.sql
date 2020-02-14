UPDATE mealplan
SET followed_plan = $1
WHERE mealplan_id = $2
RETURNING *