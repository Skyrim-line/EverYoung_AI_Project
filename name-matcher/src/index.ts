import { APIGatewayEvent, Context, Callback } from 'aws-lambda';

interface Name {
  original: string;
  pinyin: string;
}

const names: Name[] = [
  { original: "David Smith 大卫 斯密斯", pinyin: "dawei simisi" },
  { original: "Yueling Zhang 月林张", pinyin: "yueling zhang" },
  { original: "Huawen Wu 华文吴", pinyin: "huawen wu" },
  { original: "Annie Lee 李安妮", pinyin: "li anni" }
];

function normalizeName(name: string): string {
  return name.replace(/ /g, '').toLowerCase();
}

exports.handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
  const input = event.queryStringParameters?.name || ''; 
  const normalizedInput = normalizeName(input);

  const bestMatch = names.find(name => 
    name.pinyin.includes(normalizedInput) || 
    normalizeName(name.original).includes(normalizedInput)
  );

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(bestMatch ? bestMatch.original : 'No match found')
  });
};
