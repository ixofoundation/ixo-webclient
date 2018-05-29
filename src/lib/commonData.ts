export const SDGArray = [
	{ ico: 'no-poverty', title: 'NO POVERTY'},
	{ ico: 'zero-hunger', title: 'ZERO HUNGER'},
	{ ico: 'good-health', title: 'GOOD HEALTH AND WELL-BEING'},
	{ ico: 'quality-education', title: 'QUALITY EDUCATION'},
	{ ico: 'gender-equality', title: 'GENDER EQUALITY'},
	{ ico: 'clean-water', title: 'CLEAN WATER AND SANITATION'},
	{ ico: 'affordable-energy', title: 'AFFORDABLE AND CLEAN ENERGY'},
	{ ico: 'decent-work', title: 'DECENT WORK AND ECONOMIC GROWTH'},
	{ ico: 'industry-innovation', title: 'INDUSTRY, INNOVATION AND INFRASTRUCTURE'},
	{ ico: 'reduced-inequalities', title: 'REDUCED INEQUALITIES'},
	{ ico: 'sustainable-cities', title: 'SUSTAINABLE CITIES AND COMMUNITIES'},
	{ ico: 'responsible-consumption', title: 'RESPONSIBLE CONSUMPTION AND PRODUCTION'},
	{ ico: 'climate-action', title: 'CLIMATE ACTION'},
	{ ico: 'life-water', title: 'LIFE BELOW WATER'},
	{ ico: 'life-land', title: 'LIFE ON LAND'},
	{ ico: 'peace-justice', title: 'PEACE, JUSTICE AND STRONG INSTITUTIONS'},
	{ ico: 'partnership-goals', title: 'PARTNERSHIPS FOR THE GOALS'}
	];

export const deviceWidth = {
	mobile: 576,
	tablet: 768,
	desktop: 980
};

export const imgArray = () => {
	const tempArray: string[] = []; 

	for (let i = 0; i < 9; i++) {
		tempArray[i] = require(`../assets/images/image${i + 1}.jpg`);
	}
	return tempArray;
};

export const SocialMediaLinks = ['http://www.instagram.com', 'http://www.twitter.com', 'http://www.facebook.com', 'http://www.website.com'];