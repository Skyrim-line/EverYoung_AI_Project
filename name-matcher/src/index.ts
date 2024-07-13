import { APIGatewayEvent, Context, Callback } from 'aws-lambda';

const names = [
  { original: "David Smith 大卫 斯密斯", pinyin: "dawei simisi" },
  { original: "Yueling Zhang 月林张", pinyin: "yueling zhang" },
  { original: "Huawen Wu 华文吴", pinyin: "huawen wu" },
  { original: "Annie Lee 李安妮", pinyin: "li anni" }
];

function normalizeName(name: string) {
  return name.replace(/ /g, '').toLowerCase();
}


export const handler = async (event: APIGatewayEvent) => {
  try {
    const input = event.queryStringParameters?.name || '';
    const normalizedInput = normalizeName(input);

    const bestMatch = names.find(name => 
      name.pinyin.includes(normalizedInput) || 
      normalizeName(name.original).includes(normalizedInput)
    );

    return {
      statusCode: 200,
      body: JSON.stringify(bestMatch ? bestMatch.original : 'No match found')
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
};
