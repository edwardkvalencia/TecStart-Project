import React, { Component } from 'react'
import { Button, Card, Grid } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3'
import ContributeForm from  '../../components/ContributeForm'
import { Link } from '../../routes'

class CampaignShow extends Component {
	static async getInitialProps(props) {
		const campaign = Campaign(props.query.address)

		const summary = await campaign.methods.getSummary().call()

		return { 
			address: props.query.address,
			minimumContribution: summary[0],
			balance: summary[1],
			requestCount: summary[2],
			approversCount: summary[3],
			manager: summary[4]
		}
	}

	renderCards() {
		const {
			balance,
			manager,
			minimumContribution,
			requestCount,
			approversCount
		} = this.props

		const items = [
			{
				header: approversCount,
				meta: 'Number of Approvers',
				description: 'Number of people who have already contributed.'
			},

			{
				header: minimumContribution,
				meta: 'Minimum Contribution (wei)',
				description: 'You must contribute this much wei to become an approver.'
			},

			{
				header: web3.utils.fromWei(balance, 'ether'),
				meta: 'Campaign Balance (ether)',
				description: 'How much ether is left to spend.'
			},

			{
				header: requestCount,
				meta: 'Number of Requests',
				description: 'Requests approved by approvers withdraw funds from the contract.'
			},

			{
				header: manager,
				meta: 'Address of manager',
				description: 
					'Manager created created Campaign and create requests to withdraw funds.',
				style: {overflowWrap: 'break-word' }
			}			
		];

		return <Card.Group items={items} />;
	}

	render() {
		return (
			<Layout>
				<h3>Campaign Show</h3>
				<Grid>
					<Grid.Row>
						<Grid.Column width={10}>
							{this.renderCards()}
						</Grid.Column>

						<Grid.Column width={6}>
							<ContributeForm address={this.props.address}/>
						</Grid.Column>
					</Grid.Row>

					<Grid.Row>
						<Grid.Column>
							<Link route={`/campaigns/${this.props.address}/requests`}>
								<a>
									<Button primary>View Requests</Button> 
								</a>
							</Link>	
						</Grid.Column>					
					</Grid.Row>
				</Grid>
			</Layout>
		);
	}
}

export default CampaignShow