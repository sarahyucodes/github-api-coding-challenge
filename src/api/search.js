import { Octokit } from '@octokit/core'
import { restEndpointMethods } from '@octokit/plugin-rest-endpoint-methods'

const MyOctokit = Octokit.plugin(restEndpointMethods)
const octokit = new MyOctokit()

export const search = (query) => {
    return octokit.rest.search.repos({
        q: query,
        sort: 'stars',
        order: 'desc',
        per_page: 5,
        page: 1
    })
}