import { describe, it, expect } from "vitest";
import FilterUtility from "src/utilities/FilterUtility";

describe('Functions associated to the filters used on the list of items', () => {
    describe('getQueryParamsByCriteria', () => {

        it('It should return the query param name = test', () => {
          const result = FilterUtility.getQueryParamsByCriteria({ name: "test" });
          expect(result).toEqual("&name=test");
        });

        it('It should return the query params name = test and id = 2', () => {
          const result = FilterUtility.getQueryParamsByCriteria({ name: "test", id: "2" });
          expect(result).toEqual("&name=test&id=2");
        });

        it('It should return the query params year_gte = 1 and year_lte=10', () => {
          const result = FilterUtility.getQueryParamsByCriteria({ year: [1, 10]});
          expect(result).toEqual("&year_gte=1&year_lte=10");
        });
    });
});