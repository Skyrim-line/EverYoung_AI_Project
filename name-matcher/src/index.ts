// I Deployed it on AWS and write code there, it shows already could work


const names = [
  { original: "David Smith 大卫 斯密斯", pinyin: "dawei simisi" },
  { original: "Yueling Zhang 月林张", pinyin: "yueling zhang" },
  { original: "Huawen Wu 华文吴", pinyin: "huawen wu" },
  { original: "Annie Lee 李安妮", pinyin: "li anni" }
];

function normalizeName(name) {
  // remove all blank 
  let normalized = name.replace(/\s+/g, '');
  
  // turn to lowercase
  normalized = normalized.toLowerCase();
  
  return normalized;
}

function reverseChineseName(name) {
  // reverse Chinese name to match original one
  if (name.length === 3) {
    return name[1] + name[2] + name[0];
  }
  return name;
}

function reverseEnglishName(name) {
  // Reverse English name
  const parts = name.split(' ');
  if (parts.length === 2) {
    return parts[1] + ' ' + parts[0];
  }
  return name;
}

export const handler = async (event) => {
  try {
    const input = event.queryStringParameters?.name || '';
    const normalizedInput = normalizeName(input);

    console.log("Normalized Input:", normalizedInput);

    let transformedInput = '';
    if (/[\u4e00-\u9fa5]/.test(input)) {
      // if we input Chinese name
      transformedInput = reverseChineseName(normalizedInput);
    } else {
      // if we input PinYin
      transformedInput = normalizeName(reverseEnglishName(input));
    }

    // console.log("Transformed Input:", transformedInput);

    const bestMatch = names.find(name => {
      const normalizedOriginal = normalizeName(name.original);
      const normalizedPinyin = normalizeName(name.pinyin);

      // console.log("Checking name:", name.original);
      // console.log("Normalized Original:", normalizedOriginal);
      // console.log("Normalized Pinyin:", normalizedPinyin);

      return normalizedOriginal.includes(normalizedInput) ||
             normalizedOriginal.includes(transformedInput) ||
             normalizedPinyin.includes(normalizedInput) ||
             normalizedPinyin.includes(transformedInput);
    });

    return {
      statusCode: 200,
      body: JSON.stringify(bestMatch ? bestMatch.original : 'No match found')
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
};
