import React from 'react';
import { Popover } from 'react-bootstrap/lib';

export const helpUAlpha = (
    <Popover id="poHelpUAlpha">
        {'Set Uppercase letter range in <Start> - <End> format.'}
            <br />
            A-Z means all letters from A to Z and custom value will be ignored if full range is set.
 </Popover>
);
export const helpLAlpha = (
    <Popover id="poHelpLAlpha">
         {'Set Lowercase letter range in <Start> - <End> format.'}
            <br />
            a-z means all letters from a to z and custom value will be ignored if full range is set.
 </Popover>
);
export const helpNumber = (
    <Popover id="poHelpNumber">
         {'Set Number range in <Start> - <End> format.'}
            <br />
            0-9 means all letters from 0 to 9 and custom value will be ignored if full range is set.
 </Popover>
);
export const helpSpecialChar = (
    <Popover id="poHelpSpecialChar">
        Can be any special character. Selected one will be ignored on selecting this.
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