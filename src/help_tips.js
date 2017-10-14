import React from 'react';
import { Popover } from 'react-bootstrap/lib';

export const helpAlpha = (
    <Popover id="poHelpAlpha">
        Select it to include all alphabets. Use text field for seleted alphabets
 </Popover>
);
export const helpNumber = (
    <Popover id="poHelpNumber">
        Select it to include all numbers. Use text field for seleted numbers
 </Popover>
);
export const helpSpecialChar = (
    <Popover id="poHelpSpecialChar">
        Select it to include all special characters. Use text field for seleted special characters.
 </Popover>
);
export const helpSpaceBefore = (
    <Popover id="poHelpSpace">
        Select it if value can have space before it.
 </Popover>
);
export const helpSpaceAfter = (
    <Popover id="poHelpSpace">
        Select it if value can have space after it.
 </Popover>
);
export const helpGroup = (
    <Popover id="poHelpGroup">
        Select it if given value is a Group.
 </Popover>
);
export const helpList = (
    <Popover id="poHelpList">
        Select it if given value is a list of characters, else it will be considered as single word.
 </Popover>
);
export const helpExclude = (
    <Popover id="poHelpExclude">
        Select it if given value needs to be exclude, else it will be considered as Included.
 </Popover>
);
export const helpRequired = (
    <Popover id="poHelpRequired">
        Select it if given value is Optional, else it will be considered as Required.
 </Popover>
);
export const helpInfinite = (
    <Popover id="poHelpInfinite">
        Select it if given value can appear infinite times, otherwise it will limited according to the min/max values.
 </Popover>
);
export const helpMin = (
    <Popover id="poHelpMin">
        Minimum times to repeat the value.
 </Popover>
);
export const helpMax = (
    <Popover id="poHelpMax">
        Maximum times to repeat the value.
 </Popover>
);
export const helpInput = (
    <Popover id="poHelpInput">
        Custom input values. It can include Alphabets, Numbers, Special characters and space.
 </Popover>
);
export const helpJoinNext = (
    <Popover id="poHelpJoinNext">
        Select it to place this sub-expression just next to the perviour one without any kind of linking.
 </Popover>
);
export const helpJoinOR = (
    <Popover id="poHelpJoinOR">
        Select "OR" to link this sub-expression with pervious one in such a way that 1 or more sub-expressions can be true.
 </Popover>
);
export const helpJoinXOR = (
    <Popover id="poHelpJoinXOR">
        Select "XOR" to link this sub-expression with pervious one in such a way that only 1 sub-expression can be true.
 </Popover>
);