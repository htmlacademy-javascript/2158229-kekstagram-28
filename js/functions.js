// Функция для проверки длины строки. Она нам пригодится для валидации формы
const validateLines = (str, size) => str.length <= size;
validateLines('проверяемая строка', 20);

// Функция для проверки, является ли строка палиндромом. Предусмотрен случай, когда в строке встречаются пробелы
const isPalindrome = (str) => {
  const clearString = str.toLowerCase().replaceAll(' ', '');
  return clearString === clearString.split('').reverse().join('');
};
isPalindrome('Лёша на полке клопа нашёл ');

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
// Предусмотрен случай, когда вместо строки приходит число
const getNumber = (str) => parseInt(str.replace(/[^0-9]/g, ''), 10);
getNumber('1 кефир, 0.5 батона');

// Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами —
// и возвращает исходную строку, дополненную указанными символами до заданной длины.
// Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться.
// Если «добивка» слишком длинная, она обрезается с конца.
const makeStr = (str, minLength, addSymbols) => {
  const symbols = minLength - str.length;
  return symbols <= 0
    ? str
    : addSymbols.slice('0', symbols % addSymbols.length) + addSymbols.repeat(symbols / addSymbols.length) + str;
};
makeStr('q', 4, 'we');
