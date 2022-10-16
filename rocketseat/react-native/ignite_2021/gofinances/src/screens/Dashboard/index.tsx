import React from "react";
import {
  Container,
  Header,
  Photo,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Title,
  Transactions,
  TransactionList,
} from "./styles";
import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      amount: "R$ 12.000,00",
      type: "positive",
      title: "Desenvolvimento de Sites",
      date: "13/04/2020",
      category: { name: "Vendas", icon: "dollar-sign" },
    },
    {
      id: "2",
      amount: "R$ 59,00",
      type: "negative",
      title: "Hamburgueria Pizzy",
      date: "10/04/2020",
      category: { name: "Alimentação", icon: "coffee" },
    },
    {
      id: "3",
      amount: "R$ 1.200,00",
      type: "negative",
      title: "Aluguel do apartamento",
      date: "13/04/2020",
      category: { name: "Casa", icon: "shopping-bag" },
    },
  ];
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/43760220?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Josué Heringer</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entrada"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saída"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
