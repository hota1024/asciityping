/**
 * Ascii type.
 */
export type Ascii = {
  code: number
  char: string
}

export const createAscii = (code: number, char: string): Ascii => ({
  code,
  char,
})

export const numbers: Ascii[] = [
  createAscii(48, '0'),
  createAscii(49, '1'),
  createAscii(50, '2'),
  createAscii(51, '3'),
  createAscii(52, '4'),
  createAscii(53, '5'),
  createAscii(54, '6'),
  createAscii(55, '7'),
  createAscii(56, '8'),
  createAscii(57, '9'),
]

export const upperCaseLetters: Ascii[] = [
  createAscii(65, 'A'),
  createAscii(66, 'B'),
  createAscii(67, 'C'),
  createAscii(68, 'D'),
  createAscii(69, 'E'),
  createAscii(70, 'F'),
  createAscii(71, 'G'),
  createAscii(72, 'H'),
  createAscii(73, 'I'),
  createAscii(74, 'J'),
  createAscii(75, 'K'),
  createAscii(76, 'L'),
  createAscii(77, 'M'),
  createAscii(78, 'N'),
  createAscii(79, 'O'),
  createAscii(80, 'P'),
  createAscii(81, 'Q'),
  createAscii(82, 'R'),
  createAscii(83, 'S'),
  createAscii(84, 'T'),
  createAscii(85, 'U'),
  createAscii(86, 'V'),
  createAscii(87, 'W'),
  createAscii(88, 'X'),
  createAscii(89, 'Y'),
  createAscii(90, 'Z'),
]

export const lowerCaseLetters: Ascii[] = [
  createAscii(97, 'a'),
  createAscii(98, 'b'),
  createAscii(99, 'c'),
  createAscii(100, 'd'),
  createAscii(101, 'e'),
  createAscii(102, 'f'),
  createAscii(103, 'g'),
  createAscii(104, 'h'),
  createAscii(105, 'i'),
  createAscii(106, 'j'),
  createAscii(107, 'k'),
  createAscii(108, 'l'),
  createAscii(109, 'm'),
  createAscii(110, 'n'),
  createAscii(111, 'o'),
  createAscii(112, 'p'),
  createAscii(113, 'q'),
  createAscii(114, 'r'),
  createAscii(115, 's'),
  createAscii(116, 't'),
  createAscii(117, 'u'),
  createAscii(118, 'v'),
  createAscii(119, 'w'),
  createAscii(120, 'x'),
  createAscii(121, 'y'),
  createAscii(122, 'z'),
]
