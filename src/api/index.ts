import * as  authorization from "./endpoints/authorization"
import * as price from "./endpoints/price";
import * as newPeriod from "./endpoints/newPeriod"
import * as deletePeriod from "./endpoints/deletePeriod"
import * as changePeriod from "./endpoints/changePeriod"

export default{...authorization, ...price, ...newPeriod, ...deletePeriod, ...changePeriod}