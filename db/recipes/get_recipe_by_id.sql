select r.recipe_id, r.image recipe_img
, r.name recipe_name, 'mealplan' recipe_source
, u.username recipe_author, r.user_id recipe_author_id
, 0 recipe_review, r.serving recipe_servings
, c.cuisine_name recipe_cuisine, r.meal_type recipe_meal_type
, r.prep_time::INTEGER + r.cook_time::INTEGER recipe_time
, r.prep_time recipe_prep_time, r.cook_time recipe_cook_time
, r.description recipe_description, r.nutritional_info recipe_nutrition
, r.directions recipe_directions
from recipes r
inner join users u
on u.user_id = r.user_id
inner join cuisine c
on r.cuisine_id = c.cuisine_id

where r.recipe_id = $1