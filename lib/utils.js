import {mergeRight, map, keys, clone, dissoc, append, length, curry, join, ifElse, always, match} from "ramda";
import { equals, fromPairs, aperture, compose, prepend, last, reduceRight, uncurryN, apply, assoc } from "ramda";

export const fromList = ifElse(equals([]), always({}), compose(
  fromPairs,
  aperture(2),
  l => prepend(last(l), l),
));

export const e = {};

export const applyPerm = perm => val => perm[val] ?? val;

export const mult = uncurryN(2, a => compose(mergeRight(a), map(applyPerm(a))));

export const fromLists = compose(reduceRight(mult, e), map(fromList));

export const toLists = perm => {
  let lists = [];
  let p = clone(perm);
  while (!equals(p, {})) {
    const startingKey = keys(p)[0];
    let cycle = [startingKey]
    p = dissoc(startingKey, p)
    let key = applyPerm(perm)(startingKey);
    while (!equals(key, startingKey)) {
      p = dissoc(key, p);
      cycle = append(key, cycle);
      key = applyPerm(perm)(key);
      console.log({key, perm})
    }
    if (length(cycle) > 1) {
      lists = append(cycle, lists);
    }
    console.log({lists})
  }
  return lists;
};
const t = v => x => {
  console.log(v, x);
  return x;
};
const matchString = match(/[a-zA-Z0-9]+/g);
const matchStrings = match( /\([^(]*\)/g);
export const fromString = compose(fromLists, t("matchString"),map(matchString), t("matchstrings"), matchStrings)
export const listToString = l => "(" + join(" ", l) + ")";
export const listsToString = compose(
    join(""),
    map(listToString),
);
export const toString = compose(
    listsToString,
    toLists,
);