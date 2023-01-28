const router = require("express").Router();
const auth = require("../middlewars/auth").auth;
const AudioController = require("../controllers/audioController")
const validate = require("../middlewars/validate")
const audioSchema = require("../validators/audioSchema")


/**
 * get audios api
 * @route GET /audio/{id}
* @param {string} id.path.required - id of audio data
 * @group Audio - User operation
 * @returns {object} 200 -
 *      Return Jwt Token in key result.token
 *
 * @returns {Error}  Error - Unexpected error
 * @security token
 */
router.get("/:id", auth, validate("params", audioSchema.audioId), AudioController.getAudio);

/**
 * @typedef AudioCreateModel
 * @property {string} name.required
 * @property {string} imageId.required
 * @property {string} audioId.required
 * @property {string} description.required
 */


/**
 * create Audio api
 * @route POST /audio
 * @param {AudioCreateModel.model} data.body.required - user login object
 * @group Audio - User operation
 * @returns {object} 200 -
 *      Return Jwt Token in key result.token
 *
 * @returns {Error}  Error - Unexpected error
 * @security token
 */
router.post("/", auth, validate("body", audioSchema.createAudio), AudioController.createAudio);

/**
 * @typedef AudioEditModel
 * @property {string} name.required
 * @property {string} imageId.required
 * @property {string} audioId.required
 * @property {string} description.required
 * @property {string} id.required
 */


/**
 * edit audio api
 * @route PUT /audio
 * @param {AudioEditModel.model} data.body.required - user login object
 * @group Audio - User operation
 * @returns {object} 200 -
 *      Return Jwt Token in key result.token
 *
 * @returns {Error}  Error - Unexpected error
 * @security token
 */
router.put("/", auth, validate("body", audioSchema.editAudio), AudioController.editAudio);

/**
* delete audios api
* @route GET /audio/{id}
* @param {string} id.path.required - id of audio data
* @group Audio - User operation
* @returns {object} 200 -
*      Return Jwt Token in key result.token
*
* @returns {Error}  Error - Unexpected error
* @security token
*/
router.delete("/:id", auth, validate("params", audioSchema.audioId), AudioController.deleteAudio);



/**
 * @typedef AudioListModel
 * @property {number} page.required
 * @property {number} limit.required
 * @property {string} search.required
 */


/**
 * list of audios api
 * @route POST /audio/list
 * @param {AudioListModel.model} data.body.required - user login object
 * @group Audio - User operation
 * @returns {object} 200 -
 *      Return Jwt Token in key result.token
 *
 * @returns {Error}  Error - Unexpected error
 * @security token
 */
router.post("/list", auth, validate("body", audioSchema.listAudio), AudioController.listAudio)

module.exports = router