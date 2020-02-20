update recipes
set nutritional_info = $1::jsonb
where recipe_id = $2
returning *;