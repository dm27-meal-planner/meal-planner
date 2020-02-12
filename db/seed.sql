CREATE TABLE "users" (
	"user_id" PRIMARY KEY serial NOT NULL,
	"username" varchar(50) NOT NULL,
	"password" TEXT NOT NULL,
	"email" varchar(50) NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"household_number" int NOT NULL
) ;



CREATE TABLE "mealplan" (
	"mealplan_id" PRIMARY KEY serial NOT NULL,
	"user_id" bigint NOT NULL,
	"recipe_id" bigint NOT NULL,
	"meal_start" TEXT NOT NULL,
	"meal_end" TEXT NOT NULL,
	"nutritional_info" json NOT NULL,
	"followed_plan" BOOLEAN NOT NULL
) ;



CREATE TABLE "fridge" (
	"ingredient_id"  NOT NULL,
	"user_id" NOT NULL,
	"quantity" int NOT NULL,
	"unit" varchar(20) NOT NULL,
	"date_added" TEXT NOT NULL,
	"fridge_id" serial PRIMARY KEY NOT NULL
);



CREATE TABLE "grocery_list" (
	"user_id" bigint NOT NULL,
	"ingredient_id" bigint NOT NULL,
	"list_id" NOT NULL,
	"quantity" int NOT NULL,
	"unit" varchar(20) NOT NULL,
	CONSTRAINT "grocery_list_pk" PRIMARY KEY ("user_id","ingredient_id","list_id")
);



CREATE TABLE "recipes" (
	"user_id" int NOT NULL,
	"recipe_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"image" TEXT NOT NULL,
	"prep_time" varchar(30) NOT NULL,
	"cook_time" varchar(30) NOT NULL,
	"directions" TEXT NOT NULL,
	"category" varchar(50) NOT NULL,
	"meal_type" varchar(50) NOT NULL,
	"dish_type" varchar(50) NOT NULL,
	"description" TEXT NOT NULL,
	"nutritional_info" json NOT NULL,
	"serving" int NOT NULL,
	"date_added" TEXT NOT NULL,
	"cuisine_id" bigint NOT NULL REFERENCES cuisine(cuisine_id)
) ;



CREATE TABLE "recipe_ingredients" (
	"ingredient_id" bigint NOT NULL,
	"recipe_ingredient_id" serial PRIMARY KEY NOT NULL,
	"recipe_id" int NOT NULL,
	"quantity" DECIMAL NOT NULL,
	"unit" varchar(20) NOT NULL
);



CREATE TABLE "ingredients" (
	"ingredient_id" serial PRIMARY KEY NOT NULL,
	"ingredient_name" varchar(50) NOT NULL
);


CREATE TABLE "cuisine" (
	"cuisine_id" PRIMARY KEY serial NOT NULL,
	"cuisine_name" varchar(30) NOT NULL
) ;

insert into cuisine (cuisine_name)
values
('African'),
('American'),
('British'),
('Cajun'),
('Caribbean'),
('Chinese'),
('Eastern European'),
('European'),
('French'),
('German'),
('Greek'),
('Indian'),
('Irish'),
('Italian'),
('Japanese'),
('Jewish'),
('Korean'),
('Latin American'),
('Mediterranean'),
('Mexican'),
('Middle Eastern'),
('Nordic'),
('Southern'),
('Spanish'),
('Thai'),
('Vietnamese');
