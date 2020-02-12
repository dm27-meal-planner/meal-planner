UPDATE mealplan
SET date = $1,
followed_plan = $2,
resourceid = $3,
title = $4
WHERE mealplan_id  = $5;
SELECT * FROM mealplan
WHERE user_id = $6
