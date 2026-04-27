CREATE TABLE `product_brands` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `product_brands_id` PRIMARY KEY(`id`),
	CONSTRAINT `product_brands_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `product_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `product_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `product_categories_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
ALTER TABLE `products` ADD `category_id` int;--> statement-breakpoint
ALTER TABLE `products` ADD `brand_id` int;--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_product_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `product_categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_brand_id_product_brands_id_fk` FOREIGN KEY (`brand_id`) REFERENCES `product_brands`(`id`) ON DELETE no action ON UPDATE no action;