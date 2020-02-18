insert into recipes 
(user_id, name, image, prep_time, cook_time,
directions, meal_type, description, nutritional_info
servings, date_added, cuisine_id)
values
($1,$2,$3,$4,$5,
$6,$7,$8,$9,
$10,$11,(select cuisine_id from cuisine where cuisine_name ilike $12))
returning *;