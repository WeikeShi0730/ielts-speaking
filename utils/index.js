export function formatQAForDeepSeek(qaPairs) {
  if (!Array.isArray(qaPairs)) {
    throw new Error("Input must be an array of Question and Answer pairs.");
  }

  const formattedString = qaPairs
    .map((qa, index) => {
      if (!qa.question || !qa.answer) {
        throw new Error(
          'Each object must contain "question" and "answer" fields.'
        );
      }
      return `${index + 1}. Question: ${qa.question}\n   Answer: ${qa.answer}`;
    })
    .join("\n\n");

  return formattedString;
}

export function stringToJSON(message) {
  // 1. 将单引号替换为双引号
  const validJsonString = message.replace(/'/g, '"');

  // 2. 将键用双引号包裹
  const fixedJsonString = validJsonString.replace(/(\w+):/g, '"$1":');

  // 3. 解析为 JSON 对象
  const jsonObject = JSON.parse(fixedJsonString);

  return jsonObject;
}
