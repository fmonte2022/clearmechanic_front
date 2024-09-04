import { describe, it, expect } from "vitest";
import StringUtility from "src/utilities/StringUtility";

describe('Functions associated to the strings', () => {

    describe('repalacePathParams', () => {
        it('It should replace the path with params', () => {
          const result = StringUtility.repalacePathParams("/movies?_page=:page&_limit=:limit", { page: 5, limit: 20 });
          expect(result).toEqual("/movies?_page=5&_limit=20");
        });
    });

    describe('validatePattern', () => {
      it('It should validate the numeric pattern and return false', () => {
        const result = StringUtility.validatePattern("[0-9]+", "test");
        expect(result).toEqual(false);
      });

      it('It should validate the numeric pattern and return true', () => {
        const result = StringUtility.validatePattern("[0-9]+", 1000);
        expect(result).toEqual(true);
      });

      it('It should validate the currency pattern and return true', () => {
        const result = StringUtility.validatePattern("^\\d+\\.?\\d*$", "1000");
        expect(result).toEqual(true);
      });

      it('It should validate the currency pattern and return false', () => {
        const result = StringUtility.validatePattern("^\\d+\\.?\\d*$", "10.00.00");
        expect(result).toEqual(false);
      });
  });
});