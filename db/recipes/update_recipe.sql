update recipes 
set 
name = $1,
image = $2,
prep_time = $3,
cook_time = $4,
directions = $5, 
meal_type = $6,
description = $7,
-- nutritional_info = $8::jsonb,
servings = $9,
cuisine_id = (select cuisine_id from cuisine where lower(cuisine_name) = lower($10))
where recipe_id = $11
returning *;