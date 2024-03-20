import * as  authorization from "./endpoints/authorization"
import * as price from "./endpoints/price";
import * as newPeriod from "./endpoints/newPeriod"
import * as deletePeriod from "./endpoints/deletePeriod"

export default{...authorization, ...price, ...newPeriod, ...deletePeriod}