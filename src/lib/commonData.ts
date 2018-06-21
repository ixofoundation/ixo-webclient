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
	mobile: '576',
	tablet: '768',
	desktop: '980'
};

export const imgArray = () => {
	const tempArray: string[] = []; 

	for (let i = 0; i < 9; i++) {
		tempArray[i] = require(`../assets/images/image${i + 1}.jpg`);
	}
	return tempArray;
};

export const spinner = () => {
	return require(`../assets/images/spinner.svg`);
};

export const iconUpload = () => {
	return require(`../assets/images/icon-upload.svg`);
};

export const SocialMediaLinks = ['http://www.instagram.com', 'http://www.twitter.com', 'http://www.facebook.com', 'http://www.website.com'];

export const isoCountries = {
	'AF' : 'Afghanistan',
	'AX' : 'Aland Islands',
	'AL' : 'Albania',
	'DZ' : 'Algeria',
	'AS' : 'American Samoa',
	'AD' : 'Andorra',
	'AO' : 'Angola',
	'AI' : 'Anguilla',
	'AQ' : 'Antarctica',
	'AG' : 'Antigua And Barbuda',
	'AR' : 'Argentina',
	'AM' : 'Armenia',
	'AW' : 'Aruba',
	'AU' : 'Australia',
	'AT' : 'Austria',
	'AZ' : 'Azerbaijan',
	'BS' : 'Bahamas',
	'BH' : 'Bahrain',
	'BD' : 'Bangladesh',
	'BB' : 'Barbados',
	'BY' : 'Belarus',
	'BE' : 'Belgium',
	'BZ' : 'Belize',
	'BJ' : 'Benin',
	'BM' : 'Bermuda',
	'BT' : 'Bhutan',
	'BO' : 'Bolivia',
	'BA' : 'Bosnia And Herzegovina',
	'BW' : 'Botswana',
	'BV' : 'Bouvet Island',
	'BR' : 'Brazil',
	'IO' : 'British Indian Ocean Territory',
	'BN' : 'Brunei Darussalam',
	'BG' : 'Bulgaria',
	'BF' : 'Burkina Faso',
	'BI' : 'Burundi',
	'KH' : 'Cambodia',
	'CM' : 'Cameroon',
	'CA' : 'Canada',
	'CV' : 'Cape Verde',
	'KY' : 'Cayman Islands',
	'CF' : 'Central African Republic',
	'TD' : 'Chad',
	'CL' : 'Chile',
	'CN' : 'China',
	'CX' : 'Christmas Island',
	'CC' : 'Cocos (Keeling) Islands',
	'CO' : 'Colombia',
	'KM' : 'Comoros',
	'CG' : 'Congo',
	'CD' : 'Congo, Democratic Republic',
	'CK' : 'Cook Islands',
	'CR' : 'Costa Rica',
	'CI' : 'Cote D\'Ivoire',
	'HR' : 'Croatia',
	'CU' : 'Cuba',
	'CY' : 'Cyprus',
	'CZ' : 'Czech Republic',
	'DK' : 'Denmark',
	'DJ' : 'Djibouti',
	'DM' : 'Dominica',
	'DO' : 'Dominican Republic',
	'EC' : 'Ecuador',
	'EG' : 'Egypt',
	'SV' : 'El Salvador',
	'GQ' : 'Equatorial Guinea',
	'ER' : 'Eritrea',
	'EE' : 'Estonia',
	'ET' : 'Ethiopia',
	'FK' : 'Falkland Islands (Malvinas)',
	'FO' : 'Faroe Islands',
	'FJ' : 'Fiji',
	'FI' : 'Finland',
	'FR' : 'France',
	'GF' : 'French Guiana',
	'PF' : 'French Polynesia',
	'TF' : 'French Southern Territories',
	'GA' : 'Gabon',
	'GM' : 'Gambia',
	'GE' : 'Georgia',
	'DE' : 'Germany',
	'GH' : 'Ghana',
	'GI' : 'Gibraltar',
	'GR' : 'Greece',
	'GL' : 'Greenland',
	'GD' : 'Grenada',
	'GP' : 'Guadeloupe',
	'GU' : 'Guam',
	'GT' : 'Guatemala',
	'GG' : 'Guernsey',
	'GN' : 'Guinea',
	'GW' : 'Guinea-Bissau',
	'GY' : 'Guyana',
	'HT' : 'Haiti',
	'HM' : 'Heard Island & Mcdonald Islands',
	'VA' : 'Holy See (Vatican City State)',
	'HN' : 'Honduras',
	'HK' : 'Hong Kong',
	'HU' : 'Hungary',
	'IS' : 'Iceland',
	'IN' : 'India',
	'ID' : 'Indonesia',
	'IR' : 'Iran, Islamic Republic Of',
	'IQ' : 'Iraq',
	'IE' : 'Ireland',
	'IM' : 'Isle Of Man',
	'IL' : 'Israel',
	'IT' : 'Italy',
	'JM' : 'Jamaica',
	'JP' : 'Japan',
	'JE' : 'Jersey',
	'JO' : 'Jordan',
	'KZ' : 'Kazakhstan',
	'KE' : 'Kenya',
	'KI' : 'Kiribati',
	'KR' : 'Korea',
	'KW' : 'Kuwait',
	'KG' : 'Kyrgyzstan',
	'LA' : 'Lao People\'s Democratic Republic',
	'LV' : 'Latvia',
	'LB' : 'Lebanon',
	'LS' : 'Lesotho',
	'LR' : 'Liberia',
	'LY' : 'Libyan Arab Jamahiriya',
	'LI' : 'Liechtenstein',
	'LT' : 'Lithuania',
	'LU' : 'Luxembourg',
	'MO' : 'Macao',
	'MK' : 'Macedonia',
	'MG' : 'Madagascar',
	'MW' : 'Malawi',
	'MY' : 'Malaysia',
	'MV' : 'Maldives',
	'ML' : 'Mali',
	'MT' : 'Malta',
	'MH' : 'Marshall Islands',
	'MQ' : 'Martinique',
	'MR' : 'Mauritania',
	'MU' : 'Mauritius',
	'YT' : 'Mayotte',
	'MX' : 'Mexico',
	'FM' : 'Micronesia, Federated States Of',
	'MD' : 'Moldova',
	'MC' : 'Monaco',
	'MN' : 'Mongolia',
	'ME' : 'Montenegro',
	'MS' : 'Montserrat',
	'MA' : 'Morocco',
	'MZ' : 'Mozambique',
	'MM' : 'Myanmar',
	'NA' : 'Namibia',
	'NR' : 'Nauru',
	'NP' : 'Nepal',
	'NL' : 'Netherlands',
	'AN' : 'Netherlands Antilles',
	'NC' : 'New Caledonia',
	'NZ' : 'New Zealand',
	'NI' : 'Nicaragua',
	'NE' : 'Niger',
	'NG' : 'Nigeria',
	'NU' : 'Niue',
	'NF' : 'Norfolk Island',
	'MP' : 'Northern Mariana Islands',
	'NO' : 'Norway',
	'OM' : 'Oman',
	'PK' : 'Pakistan',
	'PW' : 'Palau',
	'PS' : 'Palestinian Territory, Occupied',
	'PA' : 'Panama',
	'PG' : 'Papua New Guinea',
	'PY' : 'Paraguay',
	'PE' : 'Peru',
	'PH' : 'Philippines',
	'PN' : 'Pitcairn',
	'PL' : 'Poland',
	'PT' : 'Portugal',
	'PR' : 'Puerto Rico',
	'QA' : 'Qatar',
	'RE' : 'Reunion',
	'RO' : 'Romania',
	'RU' : 'Russian Federation',
	'RW' : 'Rwanda',
	'BL' : 'Saint Barthelemy',
	'SH' : 'Saint Helena',
	'KN' : 'Saint Kitts And Nevis',
	'LC' : 'Saint Lucia',
	'MF' : 'Saint Martin',
	'PM' : 'Saint Pierre And Miquelon',
	'VC' : 'Saint Vincent And Grenadines',
	'WS' : 'Samoa',
	'SM' : 'San Marino',
	'ST' : 'Sao Tome And Principe',
	'SA' : 'Saudi Arabia',
	'SN' : 'Senegal',
	'RS' : 'Serbia',
	'SC' : 'Seychelles',
	'SL' : 'Sierra Leone',
	'SG' : 'Singapore',
	'SK' : 'Slovakia',
	'SI' : 'Slovenia',
	'SB' : 'Solomon Islands',
	'SO' : 'Somalia',
	'ZA' : 'South Africa',
	'GS' : 'South Georgia And Sandwich Isl.',
	'ES' : 'Spain',
	'LK' : 'Sri Lanka',
	'SD' : 'Sudan',
	'SR' : 'Suriname',
	'SJ' : 'Svalbard And Jan Mayen',
	'SZ' : 'Swaziland',
	'SE' : 'Sweden',
	'CH' : 'Switzerland',
	'SY' : 'Syrian Arab Republic',
	'TW' : 'Taiwan',
	'TJ' : 'Tajikistan',
	'TZ' : 'Tanzania',
	'TH' : 'Thailand',
	'TL' : 'Timor-Leste',
	'TG' : 'Togo',
	'TK' : 'Tokelau',
	'TO' : 'Tonga',
	'TT' : 'Trinidad And Tobago',
	'TN' : 'Tunisia',
	'TR' : 'Turkey',
	'TM' : 'Turkmenistan',
	'TC' : 'Turks And Caicos Islands',
	'TV' : 'Tuvalu',
	'UG' : 'Uganda',
	'UA' : 'Ukraine',
	'AE' : 'United Arab Emirates',
	'GB' : 'United Kingdom',
	'US' : 'United States',
	'UM' : 'United States Outlying Islands',
	'UY' : 'Uruguay',
	'UZ' : 'Uzbekistan',
	'VU' : 'Vanuatu',
	'VE' : 'Venezuela',
	'VN' : 'Viet Nam',
	'VG' : 'Virgin Islands, British',
	'VI' : 'Virgin Islands, U.S.',
	'WF' : 'Wallis And Futuna',
	'EH' : 'Western Sahara',
	'YE' : 'Yemen',
	'ZM' : 'Zambia',
	'ZW' : 'Zimbabwe'
};

// tslint:disable-next-line:max-line-length
export const testProjectData = JSON.stringify(require('./json/project.json'));
<<<<<<< HEAD
export const claimJson = JSON.stringify(require('./json/claimForm.json'));
// export const testClaimSchema = JSON.stringify(require('./json/claim.json'));
// export const testClaimForm = '{}';
=======
export const testClaimSchema = JSON.stringify(require('./json/claim.json'));
export const testClaimForm = '{}';
>>>>>>> 4e4d6ebafb2ca75f3609973f39ae5912ecd67dd4

export const testAgentData = '{"email":"don@ixo.com","name":"Don","role":"EA","agentDid":"did:sov:Tp25vz5iHoLJ4ktk7pKYC6","projectDid":"did:ixo:3vDYCPWvwCsj9Co3RqXp3z"}';
export const testSig = {
	type: 'ed25519-sha-256',
	created: '2018-06-06T09:18:47Z',
	creator: 'did:sov:Tp25vz5iHoLJ4ktk7pKYC6',
	publicKey: 'BGcahyLmkPeuteRemDXMUPu1W9Tc6ghuCSud4mD7fTG3',
	signatureValue: '6A548060AEB78449D17C1B825F941028728ADBBD5A4952CDF7782F128B2582A648D0697670AA3164434B8C27D18FDC213333DE7A8ADC574940B509B6B2AD590E'};

export const formJson = {
	'fields': [
		{
		'label': 'Name',
		'name': 'name',
		'type': 'text'
		},
		{
		'label': 'Number',
		'name': 'Number',
		'type': 'number'
		},
		{
		'label': 'theimage',
		'name': 'theimage',
		'type': 'image'
		},
		{
		'label': 'Owner email',
		'name': 'email',
		'type': 'text'
		},
		{
		'label': 'About',
		'name': 'about',
		'type': 'textarea'
		},
		{
		'label': 'Country',
		'name': 'country',
		'type': 'country'
		},
		{
		'label': 'Agent Template',
		'name': 'agentTemplate.name',
		'type': 'template'
		},
		{
		'label': 'Attended School',
		'name': 'attended',
		'type': 'select',
		'options': [
			{
			'label': 'Yes', 
			'value': 'true'
			},
			{
			'label': 'No',
			'value': 'false'
			}
		]
		}
	]
};