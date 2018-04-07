import React from 'react';
import { Popover } from 'react-bootstrap/lib';

export const helpEdit = <Popover id="poHelpEdit">
    Click on <i className="fa fa-pencil"></i> icon to modify the configuration for this value.
 </Popover>;

export const helpJoin = <Popover id="poHelpJoin">
    Merge the two values.
</Popover>;

export const helpSplit = <Popover id="poHelpSplit">
    Split the value.
</Popover>;

export const helpConstant = <Popover id="poHelpConstant">
    Make this a constant (If this value should appeare as it is).
</Popover>;

export const helpUppercase = <Popover id="poHelpUppercase">
    Can include Uppercase letters.
</Popover>;

export const helpLowercase = <Popover id="poHelpLowercase">
    Can include Lowercase letters.
</Popover>;

export const helpNumber = <Popover id="poHelpNumber">
    Can include numbers.
</Popover>;

export const helpSpecial = <Popover id="poHelpSpecial">
    Can include special characters.
</Popover>;

export const helpSpace = <Popover id="poHelpSpace">
    Can include space characters.
</Popover>;

export const helpOptional = <Popover id="poHelpOptional">
    This is an optional value.
</Popover>;

export const helpExclude = <Popover id="poHelpExclude">
    Exclude the values given in "Custom values" field.
</Popover>;

export const helpCustValAny = <Popover id="poHelpCustValAny">
    Enable it to provide any value in "Custom values" field.
</Popover>;

export const helpCustValList = <Popover id="poHelpCustValList">
    Enable it to provide "Comma (,)" seperated list of words in "Custom values" field.
    <br /> For example, <code>black,red,green,orange</code>
</Popover>;

export const helpCustValRange = <Popover id="poHelpCustValRange">
    Enable it to provide values range in "Custom values" field.
    <br /> For example, <code>a-g</code>, <code>d-l</code>, <code>3-6</code>
</Popover>;

export const helpMin = <Popover id="poHelpMin">
    Set the minimum length for this value.
</Popover>;

export const helpMax = <Popover id="poHelpMax">
    Set the maximum length for this value.
</Popover>;

export const helpCustom = <Popover id="poHelpCustom">
    Provide the set of values here.
    <br /> If set here, only these values will be consider for expression; not all the alphabets, digits etc.
</Popover>;