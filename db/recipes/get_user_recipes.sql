select r.recipe_id, r.image recipe_img
, r.name recipe_name, 'mealplan' recipe_source
, u.username recipe_author, 0 recipe_review
, r.prep_time::INTEGER + r.cook_time::INTEGER recipe_time
from recipes r
inner join users u
on u.user_id = r.user_id
where u.user_id = $1
order by r.date_added desc
limit 5;